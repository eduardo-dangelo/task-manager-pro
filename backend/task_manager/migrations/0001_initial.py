# Generated by Django 4.1.4 on 2022-12-07 23:38

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Okr',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='created at')),
                ('status', models.CharField(choices=[('IN', 'initiated'), ('IP', 'in progress'), ('PK', 'inactive'), ('BK', 'blocked'), ('CP', 'completed'), ('CC', 'canceled')], default='IN', max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='created at')),
                ('status', models.CharField(choices=[('IN', 'initiated'), ('IP', 'in progress'), ('PK', 'inactive'), ('BK', 'blocked'), ('CP', 'completed'), ('CC', 'canceled')], default='IN', max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Sprint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='created at')),
                ('result', models.TextField(blank=True, null=True)),
                ('status', models.CharField(choices=[('IN', 'initiated'), ('IP', 'in progress'), ('PK', 'inactive'), ('BK', 'blocked'), ('CP', 'completed'), ('CC', 'canceled')], default='IN', max_length=2)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='task_manager.project')),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='created at')),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.CharField(choices=[('IN', 'initiated'), ('IP', 'in progress'), ('PK', 'inactive'), ('BK', 'blocked'), ('CP', 'completed'), ('CC', 'canceled')], default='IN', max_length=2)),
                ('okr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='task_manager.okr')),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='task_manager.project')),
                ('sprint', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='task_manager.sprint')),
            ],
        ),
        migrations.AddField(
            model_name='okr',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='task_manager.project'),
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='created at')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='task_manager.project')),
            ],
        ),
        migrations.CreateModel(
            name='Checklist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, verbose_name='created at')),
                ('completed', models.BooleanField(default=False)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='task_manager.task')),
            ],
        ),
    ]
