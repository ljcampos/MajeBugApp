using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ManajeBugWebApi.Models
{
    /// <summary>
    /// Model class for Bug data
    /// </summary>
    public class BugApi
    {
        [Required]
        [MaxLength(500)]
        public string body { get; set; }
        public int id { get; set; }
        [Required]
        public bool isFixed { get; set; }
        //public int severity { get; set; }
        public string stepToReproduce { get; set; }
        [Required]
        [MaxLength(120)]
        public string title { get; set; }
        public string createdByid { get; set; }
        public string modifiedById { get; set; }
        public UserApi createdby { get; set; }
        public UserApi modifiedBy { get; set; }
        public int severity { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime? modifiedAt { get; set; }
        public byte[] RowVersion { get; set; }
    }

    /// <summary>
    /// Model class for User data
    /// </summary>
    public class UserApi
    {
        public string Id { get; set; }
        public DateTime createdAt { get; set; }
        public string name { get; set; }
    }

    public class CreateBugApi
    {
        [Required]
        [MaxLength(120)]
        public string title { get; set; }

        [Required]
        [MaxLength(500)]
        public string body { get; set; }

        [Required]
        public bool isFixed { get; set; }

        public string stepToReproduce { get; set; }
        
        public int severity { get; set; }
    }
}