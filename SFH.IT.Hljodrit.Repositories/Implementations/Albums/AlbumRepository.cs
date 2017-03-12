using System;
using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Albums;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Albums
{
    public class AlbumRepository : RepositoryBase<media_product>, IAlbumRepository
    {
        public AlbumRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

    }
}