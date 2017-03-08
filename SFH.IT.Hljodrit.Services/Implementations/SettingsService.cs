﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Settings;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
	public class SettingsService :ISettingsService
	{
		private readonly ISettingsRepository _settingsRepository;

		public SettingsService(ISettingsRepository settingsRepository)
		{
			_settingsRepository = settingsRepository;
		}

		public Envelope<ExceptionDto> GetAllExceptions(int pageSize, int pageNumber)
		{
			if (pageSize < 25 || pageSize > 100) throw new ArgumentException("Invalid argument");

			var exceptions = _settingsRepository.GetAll().Select(e => new ExceptionDto
			{
				Callsite = e.Callsite,
				Exception = e.Exception,
				Https = e.Https,
				Level = e.Level,
				Logged = e.Logged,
				Logger = e.Logger,
				MachineName = e.MachineName,
				Message = e.Message,
				Port = e.Port,
				Properties = e.Properties,
				ServerName = e.ServerName,
				SiteName = e.SiteName,
				UserName = e.UserName,
				Url = e.Url,
				ServerAddress = e.ServerAddress,
				RemoteAddress = e.RemoteAddress
			});
			var envelope = new Envelope<ExceptionDto>
			{
				CurrentPage = pageNumber,
				MaximumPage = (int)Math.Ceiling(exceptions.Count() / (decimal)pageSize),
				Objects = exceptions.Skip((pageNumber - 1) * pageSize).Take(pageSize)
			};

			return envelope;
		}
	}
}
