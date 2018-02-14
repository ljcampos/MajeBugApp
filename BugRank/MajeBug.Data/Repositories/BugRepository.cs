using MajeBugDomain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MajeBug.Data.Repositories
{

    public class BugRepository : BaseRepository<Bug>
    {
        public BugRepository(DataContext context) : base(context)
        {
        }
    }

}
