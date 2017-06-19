using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ListingManager.WebApi.Models;
using ListingManager.Domain.Entities.DataTransferObjects;
using System.Web.Http.Cors;

namespace ListingManager.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AgentController : ApiController
    {
        private ListingManagerWebApiContext db;

        public AgentController()
        {
            db = new ListingManagerWebApiContext();
        }

        // GET: api/Agent
        public IQueryable<AgentDTO> GetAgents()
        {
            var agents = db.Agents.Select(a =>
                 new AgentDTO
                 {
                     AgentId = a.AgentId,
                     AgentName = a.AgentName
                 });
            return agents;
        }

        // GET: api/Agent/5
        [ResponseType(typeof(Agent))]
        public async Task<IHttpActionResult> GetAgent(int id)
        {
            Agent agent = await db.Agents.FindAsync(id);
            if (agent == null)
            {
                return NotFound();
            }

            return Ok(agent);
        }

        // PUT: api/Agent/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAgent(int id, Agent agent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != agent.AgentId)
            {
                return BadRequest();
            }

            Agent agentDb = await db.Agents.FindAsync(id);
            agent.AgentCreatedDateTime = agentDb.AgentCreatedDateTime;


            agent.AgentLastUpdatedDateTime = DateTime.Now;
            db.Entry(agent).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Agent
        [ResponseType(typeof(Agent))]
        public async Task<IHttpActionResult> PostAgent(Agent agent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            agent.AgentCreatedDateTime = agent.AgentLastUpdatedDateTime = DateTime.Now;
            db.Agents.Add(agent);
            await db.SaveChangesAsync();

            //load agent name

            //db.Entry(agent).Reference(x => x.Agent).Load();

            var agentDTO = new AgentDTO()
            {
                AgentId = agent.AgentId,
                AgentName = agent.AgentName
            };

            return CreatedAtRoute("DefaultApi", new { id = agent.AgentId }, agentDTO);
        }

        // DELETE: api/Agent/5
        [ResponseType(typeof(Agent))]
        public async Task<IHttpActionResult> DeleteAgent(int id)
        {
            Agent agent = await db.Agents.FindAsync(id);
            if (agent == null)
            {
                return NotFound();
            }

            db.Agents.Remove(agent);
            await db.SaveChangesAsync();

            return Ok(agent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AgentExists(int id)
        {
            return db.Agents.Count(e => e.AgentId == id) > 0;
        }
    }
}