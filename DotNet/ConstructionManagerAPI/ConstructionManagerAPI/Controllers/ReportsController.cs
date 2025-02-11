using ConstructionManagerAPI.Data;
using ConstructionManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConstructionManagerAPI.Controllers
{
    [Route("api/reports")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/reports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetProjects()
        {
            var projects = await _context.Projects
                .Include(p => p.Manager) // Ensure Manager details are included
                .Select(p => new
                {
                    projectID = p.projectid,
                    projectName = p.project_name?? "N/A", // If null, show "N/A"
                    startDate = p.start_date != null ? p.start_date.ToString("yyyy-MM-dd") : "N/A",
                    endDate = p.end_date!= null ? p.end_date.ToString("yyyy-MM-dd") : "N/A",
                    manager = new
                    {
                        userName = p.Manager != null ? p.Manager.Name : "N/A"
                    }
                })
                .ToListAsync();

            return Ok(projects);
        }
    }
}
