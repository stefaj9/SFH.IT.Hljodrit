using System.Collections.Generic;
using System.Linq;
using SFH.IT.Hljodrit.Common.Dto;
using SFH.IT.Hljodrit.Models;
using SFH.IT.Hljodrit.Repositories.Base;
using SFH.IT.Hljodrit.Repositories.Interfaces.Project;

namespace SFH.IT.Hljodrit.Repositories.Implementations.Project
{
    public class ProjectTrackRepository : RepositoryBase<project_track>, IProjectTrackRepository
    {
        public ProjectTrackRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

        public IEnumerable<SongWithPerformersDto> GetProjectTracksById(int projectId)
        {
            var result = from projectTrack in DbContext.project_track
                join projectTrackArtist in DbContext.project_track_artist on projectTrack.id equals
                projectTrackArtist.projecttrackid
                join partyRoleType in DbContext.party_partyroletype on projectTrackArtist.rolecode equals
                partyRoleType.rolecode
                join partyReal in DbContext.party_real on projectTrackArtist.partyrealid equals partyReal.id
                join instrumentType in DbContext.party_instrumenttype on projectTrackArtist.instrumentcode equals
                instrumentType.code into instrumentCheck
                from subinstruments in instrumentCheck.DefaultIfEmpty()
                where projectTrack.projectid == projectId
                group
                new {projectTrack, partyRoleType.rolecode, partyRoleType.rolename_is, partyReal, subinstruments.name_is}
                by projectTrack.id;

            var projectTracks = new List<SongWithPerformersDto>();

            foreach (var groups in result)
            {
                var firstInGroup = groups.FirstOrDefault();
                if (firstInGroup != null)
                {
                    var song = new SongWithPerformersDto
                    {
                        Id = firstInGroup.projectTrack.id,
                        Isrc = firstInGroup.projectTrack.isrc,
                        Length = firstInGroup.projectTrack.duration,
                        Name = firstInGroup.projectTrack.trackname,
                        Number = firstInGroup.projectTrack.trackorder,
                        Performers = new List<MusicianLiteDto>()
                    };
                    foreach (var group in groups)
                    {
                        var performerIndex = song.Performers.FindIndex(p => p.Id == group.partyReal.id);
                        if (performerIndex == -1)
                        {
                            song.Performers.Add(new MusicianLiteDto
                            {
                                Id = group.partyReal.id,
                                Name = group.partyReal.fullname,
                                Instruments = new List<string> {group.name_is},
                                Roles =
                                    new List<RoleDto>
                                    {
                                        new RoleDto {RoleCode = group.rolecode, RoleName = group.rolename_is}
                                    }
                            });
                        }
                        else
                        {
                            song.Performers[performerIndex].Instruments.Add(group.name_is);
                            song.Performers[performerIndex].Roles.Add(new RoleDto { RoleCode = group.rolecode, RoleName = group.rolename_is });
                        }
                    }
                    projectTracks.Add(song);
                }
            }

            return projectTracks;
        }
    }
}
