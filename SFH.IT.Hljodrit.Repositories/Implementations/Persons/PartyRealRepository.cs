﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Performers;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Persons
{
    public class PartyRealRepository : RepositoryBase<party_real>, IPartyRealRepository
    {
        public PartyRealRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

        public IEnumerable<PersonDto> GetAllPersons(Expression<Func<project_track_artist, bool>> expression)
        {
            var performers = DbContext.project_track_artist.Where(expression).Join(DbContext.party_real,
                projectTrackArtist => projectTrackArtist.partyrealid,
                partyReal => partyReal.id, (projectTrackArtist, partyReal) => new PersonDto
                {
                    Id = partyReal.id,
                    Fullname = partyReal.fullname,
                    PostalAddressLine1 = partyReal.postaladdressline1,
                    ZipCode = partyReal.zipcode,
                    Area = partyReal.area
                    
                }).Distinct().OrderBy(person => person.Fullname).ToList();

            return performers;
        }
    }
}