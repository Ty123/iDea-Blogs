using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.OAuth;

[assembly: OwinStartup(typeof(iDea.DAL.Startup))]
namespace iDea.DAL
{
    public class Startup
    {
        public static string PublicClientId { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            app.UseOAuthBearerTokens(new OAuthAuthorizationServerOptions
            {
                //TokenEndpointPath = new PathString("/Token"),
                //Provider = new ApplicationOAuthProvider(PublicClientId),
                //AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                //AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                //// In production mode set AllowInsecureHttp = false
                //AllowInsecureHttp = true
            });
        }
    }
}
