using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IPersonService
    {
        PersonEnvelope GetPerformers(int pageSize, int pageNumber, string searchTerm);
        PersonEnvelope GetProducers(int pageSize, int pageNumber, string searchTerm);
        PersonEnvelope GetPersons(int pageSize, int pageNumber, string searchTerm);
        PersonExtendedDto GetPersonById(int personId);
    }
}
