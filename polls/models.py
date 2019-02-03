# -*- coding:utf-8 -*-
from django.db import models

# Create your models here.

# TODO 2019.02.04, 01:33 -- https://docs.djangoproject.com/en/1.8/intro/tutorial01/


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
