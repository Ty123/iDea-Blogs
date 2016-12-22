(function () {
    //route configurations
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            // route default admin 
            .when('/admin', ['$rootScope', '$state', function ($rootScope, $state) {
                $state.go('admin.dashboard');
            }])
            // route default tags
            .when('/admin/posts', ['$state', function ($state) {
                $state.go('admin.posts.dashboard');
            }])
            // route default categories
            .when('/admin/categories', ['$state', function ($state) {
                $state.go('admin.categories.dashboard', {});
            }])
            // route default tags
            .when('/admin/tags', ['$state', function ($state) {
                $state.go('admin.tags.dashboard', {});
            }])
            // route default tags
            .when('/admin/contacts', ['$state', function ($state) {
                $state.go('admin.contacts.dashboard', {});
            }])
            .otherwise('/home');

        $stateProvider
            // add tags
            .state('add-tag', {
                url: '/tags/add',
                views: {
                    '': {
                        templateUrl: '/modules/views/tag-add.html',
                        controller: 'AddTagController'
                    }
                }
            })
            // admin state
            .state('admin', { // admin main views
                url: '/admin',
                views: {
                    '': {
                        templateUrl: '/modules/views/admin/admin.html',
                        controller: 'AdminController',
                    },
                    'sidenav@admin': {
                        templateUrl: '/modules/views/admin/admin-sidenav.html',
                        controller: 'AdminSidenavController'
                    },
                    'banner@admin': {
                        templateUrl: '/modules/views/admin/admin-banner.html',
                        controller: 'AdminController'
                    }
                },
                data: {
                    requiredLogin: true
                }
            })
            // dashboard
            .state('admin.dashboard', {
                url: '/dashboard',
                templateUrl: '/modules/views/admin/admin-dash.html',
                controller: 'DashboardController',
            })
            // categorie  substate
            .state('admin.categories', {
                url: '/categories',
                templateUrl: '/modules/views/category/admin-category.html',
                controller: 'CategoryDashController'
            })
            // categorie dashboard
            .state('admin.categories.dashboard', {
                url: '/dashboard',
                templateUrl: '/modules/views/category/admin-category-dash.html',
                controller: 'CategoryDashController'
            })
            // categorie add
            .state('admin.categories.add', {
                url: '/add',
                templateUrl: '/modules/views/category/category-add.html',
                controller: 'AddCategoryController'
            })
            // categorie details
            .state('admin.categories.details', {
                url: '/details/:id',
                templateUrl: '/modules/views/shared/category-details.html',
                controller: 'CategoryDetailController'
            })
            // categorie edit
            .state('admin.categories.edit', {
                url: '/edit/:id',
                templateUrl: '/modules/views/category/category-edit.html',
                controller: 'EditCategoryController'
            })
            // categorie delete
            .state('admin.categories.delete', {
                url: '/delete/:id',
                templateUrl: '/modules/views/category/category-delete.html',
                controller: 'DeleteCategoryController'
            })
            // tags
            .state('admin.tags', { // tag main views
                url: '/tags',
                templateUrl: '/modules/views/tags/admin-tags.html',
                controller: 'TagDashController'
            })
            // tag dashboard
            .state('admin.tags.dashboard', {
                url: '/dashboard',
                templateUrl: '/modules/views/tags/admin-tag-dash.html',
                controller: 'TagDashController'
            })
            // add tags
            .state('admin.tags.add', {
                url: '/add',
                templateUrl: '/modules/views/tags/tag-add.html',
                controller: 'AddTagController'
            })
            // details tags
            .state('admin.tags.details', {
                url: '/details/:id',
                templateUrl: '/modules/views/shared/tag-details.html',
                controller: 'TagDetailController'
            })
            // details tags
            .state('admin.tags.edit', {
                url: '/edit/:id',
                templateUrl: '/modules/views/tags/tag-edit.html',
                controller: 'EditTagController'
            })
            // details tags
            .state('admin.tags.delete', {
                url: '/delete/:id',
                templateUrl: '/modules/views/tags/tag-delete.html',
                controller: 'DeleteTagController'
            })
            // category substate
            .state('admin.contacts', {
                url: '/contacts',
                templateUrl: '/modules/views/contact/admin-contact.html',
            })
            // category dashboard
            .state('admin.contacts.dashboard', {
                url: '/dashboard',
                templateUrl: '/modules/views/contact/admin-contact-dash.html',
                controller: 'ContactDashController'
            })
            //
            .state('admin.contacts.details', {
                url: '/details/:id',
                templateUrl: '/modules/views/contact/contact-details.html',
                controller: 'ContactDetailController'
            })
            // post substate
            .state('admin.posts', {
                url: '/posts',
                templateUrl: '/modules/views/post/admin-post.html',
                controller: 'PostDashController'
            })
            // post dashboard
            .state('admin.posts.dashboard', {
                url: '/dashboard',
                templateUrl: '/modules/views/post/admin-post-dash.html',
                controller: 'PostDashController'
            })
            // post add
            .state('admin.posts.add', {
                url: '/add',
                templateUrl: '/modules/views/post/post-add.html',
                controller: 'AddPostController'
            })
            // post details
            .state('admin.posts.details', {
                url: '/details/:id',
                templateUrl: '/modules/views/shared/post-details.html',
                controller: 'PostDetailController'
            })
            // post add 

            // login state
            .state('login', {
                url: '/login',
                templateUrl: '/modules/views/login.html',
                controller: 'LoginController'
            })
            // about me state
            .state('about-me', {
                url: '/about-me',
                templateUrl: '/modules/views/about-me.html'
            })
            // search state
            .state('search', {
                url: '/posts/search/:title',
                templateUrl: '/modules/views/search.html',
                controller: 'SearchController'
            })
            // contact state
            .state('contact', {
                url: '/contacts',
                templateUrl: '/modules/views/contact/contact.html',
                controller: 'AddContactController'
            })
            // tags state
            .state('tags', {
                url: '/tags',
                views: {
                    '': {
                        templateUrl: '/modules/views/tags.html',
                        controller: 'TagController'
                    },
                    'search@tags': {
                        templateUrl: '/modules/views/shared/new-search.html',
                        controller: 'TagController'
                    }
                }
            })
            // tag details state
            .state('tag-details', {
                url: '/tags/details/:id',
                views: {
                    '': {
                        templateUrl: '/modules/views/tag-details.html',
                        controller: 'TagDetailController'
                    },
                    'search@tag-details': {
                        templateUrl: '/modules/views/shared/new-search.html',
                        controller: 'TagDetailController'
                    },
                    'details@tag-details': {
                        templateUrl: '/modules/views/shared/tag-details.html',
                        controller: 'TagDetailController'
                    }
                }
            })
            // categories state
            .state('categories', {
                url: '/categories',
                views: {
                    '': {
                        templateUrl: '/modules/views/categories.html',
                        controller: 'CategorieController'
                    },
                    'search@categories': {
                        templateUrl: '/modules/views/shared/new-search.html',
                        controller: 'CategorieController'
                    }
                }
            })
            // categorie details
            .state('category-details', {
                url: '/categorie/details/:id',
                views: {
                    '': {
                        templateUrl: '/modules/views/category-details.html',
                        controller: 'CategoryDetailController'
                    },
                    'details@category-details': {
                        templateUrl: '/modules/views/shared/category-details.html',
                        controller: 'CategoryDetailController'
                    },
                    'search@category-details': {
                        templateUrl: '/modules/views/shared/new-search.html',
                        controller: 'CategoryDetailController'
                    }
                }
            })
            // posts state
            .state('posts', {
                url: '/posts',
                templateUrl: '/modules/views/posts.html',
                controller: 'PostController'
            })
            // post details state
            .state('post-details', {
                url: '/posts/details/:id',
                views: {
                    '': {
                        controller: 'PostDetailController',
                        templateUrl: '/modules/views/post-details.html'
                    },
                    'search@post-details': {
                        controller: 'PostDetailController',
                        templateUrl: '/modules/views/shared/new-search.html'
                    }
                }
            })
            // home state
            .state('home', {
                url: '/home',
                data: {
                    requireLogin: false
                },
                views: {
                    '': {
                        templateUrl: '/modules/views/home.html',
                        controller: 'HomeController',
                    },
                    'content@home': {
                        templateUrl: '/modules/views/home-content.html',
                        controller: 'HomeController',
                    },
                    'sidebar@home': {
                        templateUrl: '/modules/views/home-sidebar.html',
                        controller: 'HomeController',
                    }
                },
            });
    }])
})();