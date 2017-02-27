using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IPersonService
    {
        PersonEnvelope GetAllPerformers(int pageSize, int pageNumber);
        PersonEnvelope GetAllProducers(int pageSize, int pageNumber);
    }
}
