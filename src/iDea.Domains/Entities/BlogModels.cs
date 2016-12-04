using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iDea.Domains.Entities
{
    /// <summary>
    /// Represents a tag that is labelled on a post.
    /// </summary>
    public class Tag
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(500)]
        public string Name { get; set; }

        [Required]
        [StringLength(500)]
        public string UrlSlug { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        /// <summary>
        /// The default contstructor
        /// </summary>
        public Tag()
        {
            Posts = new HashSet<Post>();
        }
        /// <summary>
        /// The constructor
        /// </summary>
        public Tag(string name, string urlSlug, string description) : this()
        {
            Name = name;
            UrlSlug = urlSlug;
            Description = description;
        }
    }

    /// <summary>
    /// Represents a blog entry - article, presentation or any thing.
    /// </summary>
    public class Post
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The heading of the post.
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Title { get; set; }

        /// <summary>
        /// A brief paragraph about the post.
        /// </summary>
        [Required]
        public string ShortDescription { get; set; }

        /// <summary>
        /// The complete post content.
        /// </summary>
        [Required]
        public string Description { get; set; }

        /// <summary>
        /// The information about the post that has to be displayed in the &lt;meta&gt; tag (SEO).
        /// </summary>
        /// <remarks>
        /// Not sure Google still uses this for ranking but other search providers might be.
        /// </remarks>
        [Required]
        [StringLength(1000)]
        public string Meta { get; set; }

        /// <summary>
        /// The url slug that is used to define the post address.
        /// </summary>
        [Required]
        [StringLength(1000)]
        public string UrlSlug { get; set; }

        /// <summary>
        /// Flag to represent whether the article is published or not.
        /// </summary>
        public bool Published { get; set; }

        /// <summary>
        /// The post published date.
        /// </summary>
        [Required]
        public DateTime PostedOn { get; set; }

        /// <summary>
        /// The post's last modified date.
        /// </summary>
        public DateTime? Modified { get; set; }

        /// <summary>
        /// The category to which the post belongs to.
        /// </summary>
        public virtual Category Category { get; set; }

        /// <summary>
        /// Collection of tags labelled over the post.
        /// </summary>
        public virtual ICollection<Tag> Tags { get; set; }

        /// <summary>
        /// The primary key of Category table
        /// </summary>
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        /// <summary>
        /// The default constructor
        /// </summary>
        public Post()
        {
            Tags = new HashSet<Tag>();
        }

        /// <summary>
        /// The constructor 
        /// </summary>
        public Post(string title, string shortDescription, string description, string meta, string urlSlug, DateTime postedOn, Category category, List<Tag> tags)
        {
            Title = title;
            ShortDescription = shortDescription;
            Description = description;
            Meta = meta;
            UrlSlug = urlSlug;
            Published = false;
            PostedOn = postedOn;
            Category = category;
            Tags = tags;
        }

    }

    /// <summary>
    /// Encapsulates the information submitted by the contact form.
    /// </summary>
    public class Contact
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The user name.
        /// </summary>
        [Required]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Url]
        public string Website { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Body { get; set; }

        public Contact() { }

        public Contact(string name, string email, string website, string subject, string body)
            : this()
        {
            Name = name;
            Email = email;
            Website = website;
            Subject = subject;
            Body = body;
        }
    }

    /// <summary>
    /// Represents a category that contains group of blog posts.
    /// </summary>
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(500)]
        public string Name { get; set; }

        [Required]
        [StringLength(500)]
        public string UrlSlug { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        /// <summary>
        /// The default constructor
        /// </summary>
        public Category()
        {
            Posts = new HashSet<Post>();
        }

        /// <summary>
        /// The constructor
        /// </summary>
        public Category(string name, string urlSlug, string description) : this()
        {
            Name = name;
            UrlSlug = urlSlug;
            Description = description;
        }
    }
}
