namespace TaskManagement.DTOs
{
    public class UserAccountModel
    {
        public int? UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
        public Roles Role { get; set; }

        public enum Roles
        {
            Admin,
            Editor,
            Viewer
        }
    }
}
