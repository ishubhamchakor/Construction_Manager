using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConstructionManagerAPI.Models
{
    [Table("projects")] // Map to MySQL table 'projects'
    public class Project
    {
        [Key]
        public int projectid{ get; set; }

        [Required]
        public string project_name { get; set; }

        [Required]
        public DateTime start_date { get; set; }

        [Required]
        public DateTime end_date { get; set; }

        // Foreign Key
        [ForeignKey("Manager")]
        public int managed_by { get; set; }
        public User Manager { get; set; }
    }
}
