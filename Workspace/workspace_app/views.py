from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Workspace, Booking
import json

def index(request):
    workspaces = Workspace.objects.filter(is_available=True)
    return render(request, 'workspace/index.html', {'workspaces': workspaces})

@csrf_exempt
def create_booking(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            space = Workspace.objects.get(id=data['workspace_id'])
            total = space.price_per_hour * int(data['hours'])
            booking = Booking.objects.create(
                workspace=space,
                customer_name=data['name'],
                customer_email=data['email'],
                booking_date=data['date'],
                hours=data['hours'],
                total_price=total
            )
            return JsonResponse({'status': 'success', 'message': 'Booking confirmed successfully!', 'booking_id': booking.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'invalid method'}, status=405)
