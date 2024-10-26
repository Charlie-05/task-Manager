using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Models
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }

        [Required]
        public string Priority { get; set; }

        public User? Assignee { get; set; }

        public int AssigneeId { get; set; }
    }
}
