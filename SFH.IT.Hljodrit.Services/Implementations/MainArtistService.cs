using System;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Common.ViewModels;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class MainArtistService : IMainArtistService
    {
        private readonly IPartyMainArtistRepository _partyMainArtistRepository;
        private readonly IPartyRealRepository _partyRealRepository;
        private readonly IUnitOfWork<HljodritEntities> _unitOfWork;
        private readonly IPersonService _personService;

        public MainArtistService(IPartyMainArtistRepository partyMainArtistRepository, IPartyRealRepository partyRealRepository, IPersonService personService, IUnitOfWork<HljodritEntities> unitOfWork)
        {
            _partyMainArtistRepository = partyMainArtistRepository;
            _partyRealRepository = partyRealRepository;
            _personService = personService;
            _unitOfWork = unitOfWork;
        }

        public Envelope<MainArtistDto> GetMainArtistByCriteria(int pageSize, int pageNumber, string searchTerm)
        {
            var mainArtists = _partyMainArtistRepository.GetMany(ma => ma.artistname.Contains(searchTerm)).ToList();
            var maxPages = mainArtists.Count / pageSize;
            var mainArtistsFiltered =
                mainArtists.Skip((pageNumber - 1) * pageSize).Take(pageSize).Select(ma => new MainArtistDto
                {
                    Id = ma.id,
                    Name = ma.artistname,
                    PartyRealId = ma.partyrealid
                });

            return new Envelope<MainArtistDto>
            {
                CurrentPage = pageNumber,
                MaximumPage = maxPages,
                Objects = mainArtistsFiltered
            };
        }

        public int AddMainArtist(PersonRegisterViewModel mainArtist, string user)
        {
            var partyRealPerson = _partyRealRepository.Get(pr => pr.fullname == mainArtist.Name || pr.uniqueidentifier == mainArtist.Ssn.Replace("-", ""));
            int newlyCreatedMainArtistId;
            if (partyRealPerson == null)
            {
                // Need to add person
                var newPersonId = _personService.AddPerson(mainArtist);
                newlyCreatedMainArtistId = AddMainArtistToDb(mainArtist, user, newPersonId);
            }
            else
            {
                // Need to connect already defined person with the main artist
                newlyCreatedMainArtistId = AddMainArtistToDb(mainArtist, user, partyRealPerson.id);
            }

            return newlyCreatedMainArtistId;
        }

        private int AddMainArtistToDb(PersonRegisterViewModel mainArtist, string user, int newPersonId)
        {
            var entity = new party_mainartist
            {
                artistname = mainArtist.Name,
                partyrealid = newPersonId,
                artisttypecode = "SO",
                peformancetype = "M",
                genre = "",
                website = "",
                details = "",
                externalid = "0",
                updatedby = user,
                updatedon = DateTime.Now,
                createdby = user,
                createdon = DateTime.Now
            };
            _partyMainArtistRepository.Add(entity);
            _unitOfWork.Commit();

            return entity.id;
        }
    }
}
