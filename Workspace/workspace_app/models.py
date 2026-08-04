from django.db import models

class Workspace(models.Model):
    CATEGORY_CHOICES = [
        ('private', 'Private Office'),
        ('meeting', 'Meeting Room'),
        ('shared', 'Shared Space'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    price_per_hour = models.DecimalField(max_digits=6, decimal_places=2)
    capacity = models.IntegerField()
    description = models.TextField()
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.get_category_display()}"

class Booking(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=100)
    customer_email = models.EmailField()
    booking_date = models.DateField()
    hours = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.customer_name} for {self.workspace.name}"
