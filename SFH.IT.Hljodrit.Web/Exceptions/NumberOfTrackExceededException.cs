using System;

namespace SFH.IT.Hljodrit.Web.Exceptions
{
    public class NumberOfTrackExceededException : Exception
    {
        public NumberOfTrackExceededException() : base("The number of tracks have exceeded the available limit.") { }
        public NumberOfTrackExceededException(string message) : base(message) { }
        public NumberOfTrackExceededException(string message, Exception inner) : base(message, inner) { }
    }
}