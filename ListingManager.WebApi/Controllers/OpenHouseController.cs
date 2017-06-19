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
    public class OpenHouseController : ApiController
    {
        private ListingManagerWebApiContext db;

        public OpenHouseController()
        {
            db = new ListingManagerWebApiContext();
        }

        // GET: api/OpenHouse
        public IQueryable<OpenHouseDTO> GetOpenHouses()
        {
            return db.OpenHouses.Select(o =>
                new OpenHouseDTO
                {
                    OpenHouseId = o.OpenHouseId,
                    OpenHouseBeginDate = o.OpenHouseBeginDate,
                    OpenHouseEndDate = o.OpenHouseEndDate,
                    ListingId = o.Listing.ListingId,
                    ListingName = o.Listing.ListingName
                }
                );
        }

        // GET: api/OpenHouse/5
        [ResponseType(typeof(OpenHouseDTO))]
        public async Task<IHttpActionResult> GetOpenHouse(int id)
        {
            //OpenHouse openHouse = await db.OpenHouses.FindAsync(id);
            var openHouse = await db.OpenHouses.Include(b => b.Listing).Select(o =>
                new OpenHouseDTO()
                {
                    OpenHouseId = o.OpenHouseId,
                    OpenHouseBeginDate = o.OpenHouseBeginDate,
                    OpenHouseEndDate = o.OpenHouseEndDate,
                    ListingId = o.ListingId,
                    ListingName = o.Listing.ListingName
                }).SingleOrDefaultAsync(b => b.OpenHouseId == id);

            if (openHouse == null)
            {
                return NotFound();
            }

            return Ok(openHouse);
        }

        // PUT: api/OpenHouse/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOpenHouse(int id, OpenHouse openHouse)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != openHouse.OpenHouseId)
            {
                return BadRequest();
            }

            //openHouse.OpenHouseCreatedDateTime = DateTime.Now;
            openHouse.OpenHouseLastUpdatedDateTime = DateTime.Now;
            db.Entry(openHouse).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OpenHouseExists(id))
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

        // POST: api/OpenHouse
        [ResponseType(typeof(OpenHouse))]
        public async Task<IHttpActionResult> PostOpenHouse(OpenHouse openHouse)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            openHouse.OpenHouseCreatedDateTime = openHouse.OpenHouseLastUpdatedDateTime = DateTime.Now;
            db.OpenHouses.Add(openHouse);
            await db.SaveChangesAsync();

            //load listing name
            db.Entry(openHouse).Reference(x => x.Listing).Load();

            var openHouseDTO = new OpenHouseDTO()
            {
                OpenHouseId = openHouse.OpenHouseId,
                OpenHouseBeginDate = openHouse.OpenHouseBeginDate,
                OpenHouseEndDate = openHouse.OpenHouseEndDate,
                ListingId = openHouse.ListingId,
                ListingName = openHouse.Listing.ListingName
            };

            return CreatedAtRoute("DefaultApi", new { id = openHouse.OpenHouseId }, openHouseDTO);
        }

        // DELETE: api/OpenHouse/5
        [ResponseType(typeof(OpenHouse))]
        public async Task<IHttpActionResult> DeleteOpenHouse(int id)
        {
            OpenHouse openHouse = await db.OpenHouses.FindAsync(id);
            if (openHouse == null)
            {
                return NotFound();
            }

            db.OpenHouses.Remove(openHouse);
            await db.SaveChangesAsync();

            return Ok(openHouse);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OpenHouseExists(int id)
        {
            return db.OpenHouses.Count(e => e.OpenHouseId == id) > 0;
        }
    }
}