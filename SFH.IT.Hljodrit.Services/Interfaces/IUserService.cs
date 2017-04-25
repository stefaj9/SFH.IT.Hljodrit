namespace SFH.IT.Hljodrit.Services.Interfaces
{
    public interface IUserService
    {
        void SendCommentToUser(string username, string subject, string message);
        string GetEmailFromUsername(string username);
    }
}
