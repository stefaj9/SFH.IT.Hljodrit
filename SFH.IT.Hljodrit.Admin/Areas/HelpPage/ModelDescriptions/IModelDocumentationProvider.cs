using System;
using System.Reflection;

namespace SFH.IT.Hljodrit.Admin.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}