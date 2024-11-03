using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Models
{
    public class UserAccount
    {
        [Key]
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }

        public string PasswordHash { get; set; }
        public Roles Role { get; set; }



    }
    public enum Roles
    {
        Admin,
        Editor,
        Viewer
    }
}
