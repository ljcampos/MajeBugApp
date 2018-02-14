using MajeBugDomain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MajeBug.Data.Repositories
{

    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(DataContext context) : base(context)
        {

        }
    }

}
