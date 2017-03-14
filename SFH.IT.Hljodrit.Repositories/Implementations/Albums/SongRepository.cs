using System;
using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Albums
{
    public class SongRepository : RepositoryBase<media_product>, ISongRepository
    {
        public SongRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

    }
}