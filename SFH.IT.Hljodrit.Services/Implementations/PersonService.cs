﻿using System;
using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Repositories.Interfaces.Persons;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class PersonService : IPersonService
    {
        private readonly IPartyRealRepository _partyRealRepository;
        private readonly IPartyRoleRepository _partyRoleRepository;
        private const string ProducerRoleCode = "PRO";

        public PersonService(IPartyRealRepository partyRealRepository, IPartyRoleRepository partyRoleRepository)
        {
            _partyRoleRepository = partyRoleRepository;
            _partyRealRepository = partyRealRepository;
        }

        private PersonEnvelope CreateEnvelope(IEnumerable<PersonDto> persons, int pageSize, int pageNumber)
        {
            persons = persons.ToList();
            decimal maxPage = persons.Count() / (decimal)pageSize;

            var maximumPages = (int)Math.Ceiling(maxPage);

            var personList = persons.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            return new PersonEnvelope(pageNumber, maximumPages, personList);
        }

        public PersonEnvelope GetPerformers(int pageSize, int pageNumber, string searchTerm = null)
        {
            var performers = _partyRealRepository.GetPersons(p => p.rolecode != ProducerRoleCode, searchTerm).OrderBy(person => person.Fullname);
			if (pageSize < 25 || pageSize > 100) throw new ArgumentException("Invalid argument");
             
            var performersEnvelope =  CreateEnvelope(performers, pageSize, pageNumber);

            return performersEnvelope;
        }

        public PersonEnvelope GetProducers(int pageSize, int pageNumber, string searchTerm = null)
        {
            var producers = _partyRealRepository.GetPersons(p => p.rolecode == ProducerRoleCode, searchTerm).OrderBy(person => person.Fullname);

			if (pageSize < 25 || pageSize > 100) throw new ArgumentException("Invalid argument");

            var producersEnvelope = CreateEnvelope(producers, pageSize, pageNumber);

            return producersEnvelope;
        }

        public PersonEnvelope GetPersons(int pageSize, int pageNumber, string searchTerm = null)
        {
            var persons = _partyRealRepository.GetPersons(searchTerm);
			if (pageSize < 25 || pageSize > 100) throw new ArgumentException("Invalid argument");

            var personEnvelope = CreateEnvelope(persons, pageSize, pageNumber);
            
            return personEnvelope; 
        }

        public PersonEnvelope GetFilteredPersons(int pageSize, int pageNumber, bool performers, bool producers, bool vip)
        {
            IEnumerable<PersonDto> personList = new List<PersonDto>();
            if (performers)
            {
                var performersList = _partyRealRepository.GetPersons(p => p.rolecode != ProducerRoleCode, "");
                personList = personList.Concat(performersList);
            }

            if (producers)
            {
                var producersList = _partyRealRepository.GetPersons(p => p.rolecode == ProducerRoleCode, "");
                personList = personList.Concat(producersList).Distinct();
            }

            if (vip)
            {
                var vipList = _partyRealRepository.GetVipUsers();
                personList = personList.Concat(vipList).OrderBy(person => person.Fullname);
            }

            var personEnvelope = CreateEnvelope(personList, pageSize, pageNumber);

            return personEnvelope;
        }

        public PersonEnvelope GetVipUsers(int pageSize, int pageNumber)
        {
            var vipUsers = _partyRealRepository.GetVipUsers();
            if (pageSize < 25 || pageSize > 100) throw new ArgumentException("Invalid argument");

            var vipUsersEnvelope = CreateEnvelope(vipUsers, pageSize, pageNumber);

            return vipUsersEnvelope;
        }

        public PersonExtendedDto GetPersonById(int personId)
        {
            var person = _partyRealRepository.GetById(personId);

            return new PersonExtendedDto(person);
        }

        public IEnumerable<RoleDto> GetPersonRoles()
        {
            return _partyRoleRepository.GetMany(pr => pr.active == true).Select(pr => new RoleDto
            {
                RoleCode = pr.rolecode,
                RoleName = pr.rolename_is
            });
        }
    }
}
