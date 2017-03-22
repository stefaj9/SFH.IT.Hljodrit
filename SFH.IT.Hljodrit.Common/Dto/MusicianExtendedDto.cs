using System.Collections.Generic;

namespace SFH.IT.Hljodrit.Common.Dto
{
    public class MusicianExtendedDto
    {

        public MusicianExtendedDto()
        {
            Songs = new Dictionary<string, IEnumerable<string>>();
        }

        public string Fullname { get; set; }

        public Dictionary<string, IEnumerable<string>> Songs;
        
    }
}