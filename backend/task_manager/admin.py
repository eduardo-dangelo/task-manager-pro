from django.contrib import admin
from .models import Project, Okr, Note, Status, Task, Checklist, Sprint

class NoteInline(admin.TabularInline):
    model = Note
    extra = 0


class SprintInline(admin.TabularInline):
    model = Sprint
    extra = 0


class TaskInline(admin.TabularInline):
    model = Task
    fieldsets = [
        (None, {'fields': ['id', 'title', 'status', 'okr', 'sprint', 'project']}),
    ]
    extra = 0


class OkrInline(admin.TabularInline):
    model = Okr
    fieldsets = [
        (None, {'fields': ['id', 'title', 'status']}),
    ]
    extra = 0


class ChecklistInline(admin.TabularInline):
    model = Checklist
    extra = 0


class ProjectAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['title', 'created_at', 'status']}),
    ]
    inlines = [OkrInline, SprintInline, NoteInline]


class OkrAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['title', 'description', 'created_at', 'status', 'project']}),
    ]
    inlines = [TaskInline]


class TaskAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['title', 'description', 'created_at', 'status', 'okr', 'sprint']}),
    ]
    inlines = [ChecklistInline]


class SprintAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['title', 'created_at', 'project', 'result', 'completed']}),
    ]
    inlines = [TaskInline]

admin.site.register(Okr, OkrAdmin)
admin.site.register(Status)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Sprint, SprintAdmin)
# Register your models here.
