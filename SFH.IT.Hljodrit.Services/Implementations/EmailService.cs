using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SFH.IT.Hljodrit.Services.Implementations
{
    public static class EmailService
    {
        private const string Smtp = "smtp.gmail.com";
        public static Task SendAsync(string to, string from, string subject, string message)
        {
            SmtpClient client = new SmtpClient
            {
                Host = Smtp,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("sfhuser@gmail.com", "%q3Embrbhe8KMQx&$el4a@yb"),
                Port = 587,
                EnableSsl = true
            };
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
