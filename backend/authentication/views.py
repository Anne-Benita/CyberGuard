from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import (
    UserSerializer,
    LoginSerializer,
    SignupSerializer,
)


# ----------------------------
# LOGIN
# ----------------------------
@api_view(["POST"])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    identifier = serializer.validated_data["identifier"]
    password = serializer.validated_data["password"]

    user = User.objects.filter(
        Q(username__iexact=identifier) | Q(email__iexact=identifier)
    ).first()

    if not user:
        return Response(
            {"success": False, "error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not user.check_password(password):
        return Response(
            {"success": False, "error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not user.is_active:
        return Response(
            {"success": False, "error": "Account disabled"},
            status=status.HTTP_403_FORBIDDEN,
        )

    login(request, user)

    return Response({
        "success": True,
        "user": UserSerializer(user).data
    })


# ----------------------------
# SIGNUP
# ----------------------------
@api_view(["POST"])
def signup_view(request):
    serializer = SignupSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    if User.objects.filter(username=serializer.validated_data["username"]).exists():
        return Response(
            {"success": False, "error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = serializer.save()

    return Response({
        "success": True,
        "user": UserSerializer(user).data
    })


# ----------------------------
# LOGOUT
# ----------------------------
@api_view(["POST"])
def logout_view(request):
    logout(request)
    return Response({"success": True})
