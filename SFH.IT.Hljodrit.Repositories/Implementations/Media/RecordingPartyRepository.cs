using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Media;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Media
{
    public class RecordingPartyRepository : RepositoryBase<recording_party>, IRecordingPartyRepository
    {
        public RecordingPartyRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public IEnumerable<MediaWithRoleDto> GetAllMediaAssociatedWithMusician(int partyRealId, int pageNumber, int pageSize, string searchTerm)
        {
            var result = (from musician in DbContext.recording_party
                join recording in DbContext.media_recording on musician.recordingid equals recording.id
                join person in DbContext.party_real on musician.partyrealid equals person.id
                join instruments in DbContext.party_instrumenttype on musician.instrumentcode equals instruments.code
                join roles in DbContext.party_partyroletype on musician.rolecode equals roles.rolecode
                where musician.partyrealid == partyRealId && recording.recordingtitle.Contains(searchTerm)
                group new {musician, recording, person, instruments, roles} by
                new {recordingId = recording.id}).OrderBy(p => p.Key.recordingId).Skip((pageNumber - 1) * pageSize).Take(pageSize);

            var allMedias = new List<MediaWithRoleDto>();

            foreach (var group in result)
            {
                var contains = allMedias.Find(p => p.Id == group.Key.recordingId);
                var media = contains ?? new MediaWithRoleDto();
                var instruments = contains == null ? new List<InstrumentDto>() : media.Instruments.ToList();
                var roles = contains == null ? new List<RoleDto>() : media.Roles.ToList();
                
                foreach (var item in group)
                {
                    instruments.Add(new InstrumentDto
                    {
                        IdCode = item.instruments.code,
                        InstrumentNameIcelandic = item.instruments.name_is,
                        InstrumentNameEnglish = item.instruments.name_en,
                        DescriptionInIcelandic = item.instruments.description_is
                    });

                    roles.Add(new RoleDto
                    {
                        RoleCode = item.roles.rolecode,
                        RoleName = item.roles.rolename_is
                    });

                    if (contains == null)
                    {
                        media.Id = item.recording.id;
                        media.Isrc = item.recording.isrc;
                        media.Duration = item.recording.duration;
                        media.MainArtist = item.recording.party_mainartist != null ? item.recording.party_mainartist.artistname : "";
                        media.ReleaseDate = item.recording.recordingdate;
                        media.Title = item.recording.recordingtitle;
                    }
                }

                media.Instruments = instruments;
                media.Roles = roles;

                if (contains == null)
                {
                    allMedias.Add(media);
                }
            }
            return allMedias;
        }
    }
}
