using System;
using SFH.IT.Hljodrit.Repositories.Interfaces.Authentication;
using SFH.IT.Hljodrit.Services.Interfaces;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserLookupRepository _userLookupRepository;
        private readonly IEmailService _emailService;

        public UserService(IUserLookupRepository userLookupRepository, IEmailService emailService)
        {
            _userLookupRepository = userLookupRepository;
            _emailService = emailService;
        }

        public void SendCommentToUser(string username, string subject, string message)
        {
            var email = GetEmailFromUsername(username);
            _emailService.SendEmail(email, subject, message);
        }

        public string GetEmailFromUsername(string username)
        {
            var email = _userLookupRepository.GetEmailByUsername(username);
            if (string.IsNullOrEmpty(email))
            {
                throw new NullReferenceException("Email was not found.");
            }
            return _userLookupRepository.GetEmailByUsername(username);
        }
    }
}
