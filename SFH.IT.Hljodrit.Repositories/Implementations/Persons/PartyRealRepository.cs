using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Persons
{
    public class PartyRealRepository : RepositoryBase<party_real>, IPartyRealRepository
    {
        public PartyRealRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

        public IEnumerable<PersonDto> GetPersons(Expression<Func<project_track_artist, bool>> expression, string searchTerm)
        {
            var performers = DbContext.project_track_artist.Where(expression).Join(DbContext.party_real,
                projectTrackArtist=> projectTrackArtist.partyrealid,
                partyReal => partyReal.id, (projectTrackArtist, partyReal) => new PersonDto
                {
                    Id = partyReal.id,
                    Fullname = partyReal.fullname,
                    PostalAddressLine1 = partyReal.postaladdressline1,
                    ZipCode = partyReal.zipcode,
                    Area = partyReal.area
                    
                }).Distinct().Where(person => person.Fullname.Contains(searchTerm));

            return performers;
        }

        public IEnumerable<PersonDto> GetPersons(string searchTerm)
        {
            var persons = DbContext.party_real.Where(
                partyReal => partyReal.fullname.Contains(searchTerm)).Select(person => new PersonDto()
            {
                Id = person.id,
                Fullname = person.fullname,
                PostalAddressLine1 = person.postaladdressline1,
                ZipCode = person.zipcode,
                Area = person.area
            }).OrderBy(person => person.Fullname);

            return persons;
        }

        public PersonExtendedDto GetPersonById(int personId)
        {
            var resultPerson = DbContext.party_real.Where(person => person.id == personId).Select(person => new PersonExtendedDto
            {
                Id = person.id,
                Fullname = person.fullname,
                PostalAddressLine1 = person.postaladdressline1,
                ZipCode = person.zipcode,
                Area = person.area,
                Ssn = person.uniqueidentifier,
                DateOfBirth = person.dateofbirth,
                Website = person.website

            }).SingleOrDefault();

            return resultPerson;
        }
    }
}
