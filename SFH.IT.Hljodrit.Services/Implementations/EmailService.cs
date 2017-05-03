using System.Net.Mail;
using System.Threading.Tasks;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public static class EmailService
    {
        private const string Smtp = "mx10.vist.is";
        public static Task SendAsync(string to, string from, string subject, string message)
        {
            SmtpClient client = new SmtpClient {Host = "smtp.ru.is"};
            MailMessage msg = new MailMessage(from, to)
            {
                IsBodyHtml = true,
                Subject = subject,
                Body = message
            };

            return client.SendMailAsync(msg);
        }

        public static void Send(string to, string from, string subject, string message)
        {
            Task.WaitAll(SendAsync(to, from, subject, message));
        }
        public static void SendNoWait(string to, string from, string subject, string message)
        {
            Task.Run(() => { SendAsync(to, from, subject, message); });
        }
    }
}
