﻿using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IProjectService
    {
        ProjectEnvelope GetAllProjects(int pageSize, int pageNumber);
    }
}
