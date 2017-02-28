using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace SFH.IT.Hljodrit.Admin.Handlers
{
    public class HttpExceptionHandler : ExceptionHandler
    {
        public override void Handle(ExceptionHandlerContext context)
        {
            var result = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent(context.Exception.Message),
                ReasonPhrase = context.Exception.GetType().ToString()
            };
            context.Result = new GeneralResult(context.Request, result);
        }
    }

    // Abstraction of the HttpResponseMessage
    public class GeneralResult : IHttpActionResult
    {
        private HttpRequestMessage _request;
        private HttpResponseMessage _httpResponseMessage;

        public GeneralResult(HttpRequestMessage request, HttpResponseMessage httpResponseMessage)
        {
            _request = request;
            _httpResponseMessage = httpResponseMessage;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(_httpResponseMessage);
        }
    }
}