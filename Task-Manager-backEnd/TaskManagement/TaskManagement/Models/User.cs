using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }

        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();

        public Address? Address { get; set; }
    }
}
