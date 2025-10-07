# apps/articles/admin.py
from django.contrib import admin
from .models import Article, Category, Tag

# Inline for Articles (Optional, for better admin view)
class TagInline(admin.TabularInline):
    model = Article.tags.through
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'published_at', 'views_count')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('category', 'tags', 'published_at')
    search_fields = ('title', 'content')
    raw_id_fields = ('author',)
    # inlines = [TagInline] # Uncomment if you prefer M2M management this way