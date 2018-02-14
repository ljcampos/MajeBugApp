using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MajeBugDomain
{
    public class Bug
    {
        public string body { get; set; }
        public int id { get; set; }
        public bool isFixed { get; set; }
        //public int severity { get; set; }
        public string stepToReproduce { get; set; }
        public string title { get; set; }
        public string createdByid { get; set; }
        public string modifiedById { get; set; }
        public User createdby { get; set; }
        public User modifiedBy { get; set; }
        public Severity severity { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime? modifiedAt { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
