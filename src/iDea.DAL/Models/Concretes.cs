using iDea.Domains.Contracts;
using iDea.Domains.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace iDea.DAL.Models
{
    public class ResourceDbContext : DbContext, IUnitOfWork
    {
        #region Private Members
        private readonly IRepository<Post> _postRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly IRepository<Tag> _tagRepository;

        #endregion

        public ResourceDbContext(): base("ResourceConnection")
        {
            _postRepository = new Repository<Post>(this);
            _categoryRepository = new Repository<Category>(this);
            _tagRepository = new Repository<Tag>(this);
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Post>()
                        .HasMany<Tag>(p => p.Tags)
                        .WithMany(t => t.Posts)
                        .Map(cs =>
                        {
                            cs.MapLeftKey("PostId");
                            cs.MapRightKey("TagId");
                            cs.ToTable("TagPost");
                        });

        }

        #region IUnitOfWork Members

        public IRepository<Post> PostRepository
        {
            get { return _postRepository; }
        }

        public IRepository<Category> CategoryRepository
        {
            get { return _categoryRepository; }
        }

        public IRepository<Tag> TagRepository
        {
            get { return _tagRepository; }
        }

        public void Save()
        {
            this.SaveChanges();
        }

        #endregion
    }

    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbContext context;
        private readonly IDbSet<T> dbSet;

        public Repository(DbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<T>();
        }

        #region IRepository<T> Members

        public IEnumerable<T> GetAll()
        {
            return dbSet.ToList();
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "")
        {
            IQueryable<T> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public T FindById(int id)
        {
            return dbSet.Find(id);
        }

        public void Add(T entity)
        {
            dbSet.Add(entity);
        }

        public void Delete(T entity)
        {
            dbSet.Remove(entity);
        }

        public void Edit(T entity)
        {
            context.Entry<T>(entity).State = EntityState.Modified;
        }

        public void Save()
        {
            context.SaveChanges();
        }

        #endregion
    }
}