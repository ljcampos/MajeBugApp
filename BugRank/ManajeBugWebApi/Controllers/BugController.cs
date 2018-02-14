using MajeBug.Data;
using MajeBug.Data.Repositories;
using MajeBugDomain;
using ManajeBugWebApi.Helpers;
using ManajeBugWebApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;

namespace ManajeBugWebApi.Controllers
{
    [Authorize]
    public class BugController : BaseApi
    {
        /// <summary>
        /// GET /api/bug
        /// </summary>
        /// <returns></returns>
        [ResponseType(typeof(List<BugApi>))]
        public IHttpActionResult Get()
        {
            using (var context = new DataContext())
            {
                BugRepository bugRepository = new BugRepository(context);
                var bugs = bugRepository.GetAll();
                var models = MapperHelp.Map<ICollection<BugApi>>(bugs);
                return Ok(models);
            }
        }

        // <summary>
        /// GET api/bug/5
        /// </summary>
        /// <returns>Bugs instance</returns>
        [ResponseType(typeof(List<BugApi>))]
        public IHttpActionResult Get(int id)
        {
            using (var context = new DataContext())
            {
                BugRepository bugRepository = new BugRepository(context);
                var bugs = bugRepository.Find(id);
                UserRepository userRepository = new UserRepository(context);
                bugs.createdby = userRepository.Find(bugs.createdByid);
                if (bugs.modifiedById != null)
                {
                    bugs.modifiedBy = userRepository.Find(bugs.modifiedById);
                }
                var models = MapperHelp.Map<BugApi>(bugs);
                return Ok(models);
            }
        }

        // POST: api/Bug
        [ResponseType(typeof(BugApi))]
        public IHttpActionResult Post([FromBody]CreateBugApi model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (DataContext dataContext = new DataContext())
            {
                BugRepository bugRepository = new BugRepository(dataContext);
                var bug = MapperHelp.Map<Bug>(model);
                bug.createdAt = DateTime.Now;
                bug.createdByid = CurrentUserId;
                bugRepository.Insert(bug);
                dataContext.SaveChanges();
                var bugApi = MapperHelp.Map<BugApi>(bug);
                return Ok(bugApi);
            }
        }

        // PUT: api/Bug/5
        public IHttpActionResult Put(int id, [FromBody]BugApi model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                using (DataContext context = new DataContext())
                {
                    BugRepository bugRepository = new BugRepository(context);
                    var bug = MapperHelp.Map<Bug>(model);
                    bug.modifiedAt = DateTime.Now;
                    bug.modifiedById = CurrentUserId;
                    bugRepository.Update(bug);
                    context.SaveChanges();
                    var bugApi = MapperHelp.Map<BugApi>(bug);
                    return Ok(bugApi);
                }
            } catch(DbUpdateConcurrencyException ex) {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.Conflict, new { Message = "El registro ha sido modificado" }));
            }
        }

        // DELETE: api/Bug/5
        public void Delete(int id)
        {
        }
    }
}
