using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SFH.IT.Hljodrit.Common;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
	public interface ISettingsService
	{
		Envelope<ExceptionDto> GetAllExceptions(int pageSize, int pageNumber);
	}
}
