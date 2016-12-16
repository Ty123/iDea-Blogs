using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace iDea.DAL.Models
{
    public class PostDetail
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string ShortDescription { get; set; }

        public string Description { get; set; }

        public string Meta { get; set; }

        public string UrlSlug { get; set; }

        public CategoryDetail Category { get; set; }

        public List<TagDetail> Tags { get; set; }

        public DateTime PostDate { get; set; }
    }

    public class TagDetail
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string UrlSlug { get; set; }

        public string Description { get; set; }

        public List<PostDetail> Posts { get; set; }
    }

    public class CategoryDetail
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string UrlSlug { get; set; }

        public string Description { get; set; }

        public List<PostDetail> Posts { get; set; }
    }
}