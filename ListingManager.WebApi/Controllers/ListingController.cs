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

namespace ListingManager.WebApi.Controllers
{
    public class ListingController : ApiController
    {
        private ListingManagerWebApiContext db;

        public ListingController()
        {
            db = new ListingManagerWebApiContext();
        }

        // GET: api/Listing
        public IQueryable<ListingDTO> GetListings()
        {
            var listings = db.Listings.Select(l =>
            new ListingDTO
            {
                ListingId = l.ListingId,
                ListingName = l.ListingName,
                ListingAddress = l.ListingAddress,
                AgentId = l.AgentId,
                AgentName = l.Agent.AgentName
            });
            return listings;
        }

        // GET: api/Listing/5
        [ResponseType(typeof(ListingDetailDTO))]
        public async Task<IHttpActionResult> GetListing(int id)
        {
            //Listing listing = await db.Listings.FindAsync(id);
            var listing = await db.Listings.Include(l => l.Agent).Select(l =>
             new ListingDetailDTO()
             {
                 ListingId = l.ListingId,
                 ListingName = l.ListingName,
                 ListingAddress = l.ListingAddress,
                 AgentName = l.Agent.AgentName
             }).SingleOrDefaultAsync(l => l.ListingId == id);

            if (listing == null)
            {
                return NotFound();
            }

            return Ok(listing);
        }

        // PUT: api/Listing/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutListing(int id, Listing listing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != listing.ListingId)
            {
                return BadRequest();
            }

            listing.ListingLastUpdatedDateTime = DateTime.Now;
            db.Entry(listing).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListingExists(id))
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

        // POST: api/Listing
        [ResponseType(typeof(Listing))]
        public async Task<IHttpActionResult> PostListing(Listing listing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            listing.ListingCreatedDateTime = listing.ListingLastUpdatedDateTime = DateTime.Now;
            db.Listings.Add(listing);
            await db.SaveChangesAsync();

            //load agent name

            db.Entry(listing).Reference(x => x.Agent).Load();

            var listingDTO = new ListingDTO()
            {
                ListingId = listing.ListingId,
                ListingName = listing.ListingName,
                ListingAddress = listing.ListingAddress,
                AgentId = listing.AgentId,
                AgentName = listing.Agent.AgentName
            };

            return CreatedAtRoute("DefaultApi", new { id = listing.ListingId }, listingDTO);
        }

        // DELETE: api/Listing/5
        [ResponseType(typeof(Listing))]
        public async Task<IHttpActionResult> DeleteListing(int id)
        {
            Listing listing = await db.Listings.FindAsync(id);
            if (listing == null)
            {
                return NotFound();
            }

            db.Listings.Remove(listing);
            await db.SaveChangesAsync();

            return Ok(listing);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ListingExists(int id)
        {
            return db.Listings.Count(e => e.ListingId == id) > 0;
        }
    }
}