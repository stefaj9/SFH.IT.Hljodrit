using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;

namespace SFH.IT.Hljodrit.Repositories.Interfaces.Performers
{
    public interface IPartyRealRepository : IRepository<party_real>
    {
        IEnumerable<PersonDto> GetAllPersons(Expression<Func<project_track_artist, bool>> expression);
    }
}




