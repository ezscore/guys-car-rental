'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { vehicles, locations, enhancements } from '@/data/vehicles';

function ReservationForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<{
    confirmationNumber: string;
    reservationId: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    // Step 1: Dates & Location
    pickupLocation: searchParams.get('pickup') || '',
    pickupDate: searchParams.get('from') || '',
    pickupTime: '09:00',
    returnDate: searchParams.get('to') || '',
    returnTime: '09:00',

    // Step 2: Vehicle Selection
    vehicleGroup: searchParams.get('vehicle') || '',

    // Step 3: Customer Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    driversLicense: '',
    birthdate: '',
    licenseExpiration: '',
    street: '',
    city: '',
    state: '',
    zip: '',

    // Step 4: Enhancements
    selectedEnhancements: [] as string[],
    specialRequests: '',
  });

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleEnhancement = (enhancementId: string) => {
    const current = formData.selectedEnhancements;
    if (current.includes(enhancementId)) {
      updateFormData('selectedEnhancements', current.filter(id => id !== enhancementId));
    } else {
      updateFormData('selectedEnhancements', [...current, enhancementId]);
    }
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess({
          confirmationNumber: data.reservation.confirmation_number || 'N/A',
          reservationId: data.reservation.id || 'N/A',
        });
      } else {
        setSubmitError(data.error || 'Failed to create reservation. Please try again.');
      }
    } catch (error) {
      console.error('Reservation submission error:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedVehicle = vehicles.find(v => v.group === formData.vehicleGroup);
  const selectedExtras = enhancements.filter(e => formData.selectedEnhancements.includes(e.id));

  const calculateTotal = () => {
    if (!selectedVehicle || !formData.pickupDate || !formData.returnDate) return 0;

    const pickup = new Date(formData.pickupDate);
    const returnD = new Date(formData.returnDate);
    const days = Math.ceil((returnD.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)) || 1;

    let total = selectedVehicle.pricing.daily * days;

    selectedExtras.forEach(extra => {
      if (extra.priceType === 'daily') {
        total += extra.price * days;
      } else {
        total += extra.price;
      }
    });

    return total;
  };

  const steps = [
    { num: 1, title: 'Dates & Location', icon: 'event' },
    { num: 2, title: 'Select Vehicle', icon: 'directions_car' },
    { num: 3, title: 'Your Information', icon: 'person' },
    { num: 4, title: 'Enhancements', icon: 'add_circle' },
    { num: 5, title: 'Review & Confirm', icon: 'check_circle' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="gradient-bg text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Reservation</h1>
          <p className="text-xl text-blue-50">
            Complete the form below. We will confirm your reservation request within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step.num
                        ? 'bg-primary text-white scale-110'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    <span className="material-icons">{step.icon}</span>
                  </div>
                  <div className="text-xs mt-2 font-semibold text-center hidden sm:block">
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      currentStep > step.num ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Dates & Location */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pickup & Return Details</h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pickup Location *
                </label>
                <select
                  value={formData.pickupLocation}
                  onChange={(e) => updateFormData('pickupLocation', e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select location...</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => updateFormData('pickupDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup Time *
                  </label>
                  <input
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => updateFormData('pickupTime', e.target.value)}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => updateFormData('returnDate', e.target.value)}
                    min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Return Time *
                  </label>
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => updateFormData('returnTime', e.target.value)}
                    className="input"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Vehicle Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Vehicle</h2>

              <div className="grid gap-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => updateFormData('vehicleGroup', vehicle.group)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.vehicleGroup === vehicle.group
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{vehicle.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {vehicle.passengers} passengers • {vehicle.equipment.join(', ')}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-primary">
                          ${vehicle.pricing.daily}/day
                        </div>
                        <div className="text-sm text-gray-600">
                          ${vehicle.pricing.weekly}/week
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Customer Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="input"
                    placeholder="+1 (758) 451-7885"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => updateFormData('country', e.target.value)}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Driver's License Number *
                </label>
                <input
                  type="text"
                  value={formData.driversLicense}
                  onChange={(e) => updateFormData('driversLicense', e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => updateFormData('birthdate', e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    License Expiration Date *
                  </label>
                  <input
                    type="date"
                    value={formData.licenseExpiration}
                    onChange={(e) => updateFormData('licenseExpiration', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => updateFormData('street', e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Zip/Postal Code *
                </label>
                <input
                  type="text"
                  value={formData.zip}
                  onChange={(e) => updateFormData('zip', e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 4: Enhancements */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Rental Enhancements</h2>
              <p className="text-gray-600 mb-6">Select any additional services you'd like to add</p>

              <div className="grid gap-4">
                {enhancements.map((enhancement) => (
                  <div
                    key={enhancement.id}
                    onClick={() => toggleEnhancement(enhancement.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.selectedEnhancements.includes(enhancement.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{enhancement.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{enhancement.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-bold text-primary">
                          ${enhancement.price}/{enhancement.priceType === 'daily' ? 'day' : 'once'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => updateFormData('specialRequests', e.target.value)}
                  className="input min-h-[100px]"
                  placeholder="Any special requirements or requests..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Review & Confirm */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Reservation</h2>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rental Details</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Pickup:</strong> {formData.pickupLocation} - {formData.pickupDate} at {formData.pickupTime}</p>
                    <p><strong>Return:</strong> {formData.pickupLocation} - {formData.returnDate} at {formData.returnTime}</p>
                  </div>
                </div>

                {selectedVehicle && (
                  <div className="pt-4 border-t border-gray-300">
                    <h3 className="font-semibold text-gray-900 mb-2">Vehicle</h3>
                    <p className="text-sm text-gray-700">{selectedVehicle.name} - ${selectedVehicle.pricing.daily}/day</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-300">
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.email}</p>
                    <p>{formData.phone}</p>
                    <p>{formData.country}</p>
                  </div>
                </div>

                {selectedExtras.length > 0 && (
                  <div className="pt-4 border-t border-gray-300">
                    <h3 className="font-semibold text-gray-900 mb-2">Enhancements</h3>
                    {selectedExtras.map((extra) => (
                      <p key={extra.id} className="text-sm text-gray-700">
                        {extra.name} - ${extra.price}/{extra.priceType === 'daily' ? 'day' : 'once'}
                      </p>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t-2 border-gray-400">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Estimated Total</h3>
                    <div className="text-3xl font-bold text-primary">
                      ${calculateTotal().toFixed(2)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Final price may vary based on actual rental period and local taxes</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-3 mt-0.5">info</span>
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Important Information</p>
                    <p>We will confirm your reservation request within 24 hours. If you prefer, you can also call or fax us at the numbers provided below.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`btn-outline ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="material-icons mr-2 align-middle">arrow_back</span>
              Previous
            </button>

            {currentStep < 5 ? (
              <button onClick={nextStep} className="btn-primary">
                Next
                <span className="material-icons ml-2 align-middle">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`btn-secondary text-lg px-8 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="material-icons mr-2 align-middle animate-spin">refresh</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2 align-middle">send</span>
                    Submit Reservation
                  </>
                )}
              </button>
            )}
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-xl p-6">
              <div className="flex items-start">
                <span className="material-icons text-green-500 mr-3 text-4xl">check_circle</span>
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">Reservation Confirmed!</h3>
                  <p className="text-green-800 mb-3">
                    Your reservation has been successfully created.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Confirmation Number:</strong> {submitSuccess.confirmationNumber}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Reservation ID:</strong> {submitSuccess.reservationId}
                    </p>
                  </div>
                  <p className="text-sm text-green-700 mt-4">
                    A confirmation email has been sent to {formData.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mt-6 bg-red-50 border-2 border-red-500 rounded-xl p-6">
              <div className="flex items-start">
                <span className="material-icons text-red-500 mr-3 text-4xl">error</span>
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">Reservation Failed</h3>
                  <p className="text-red-800">{submitError}</p>
                  <p className="text-sm text-red-700 mt-3">
                    Please try again or contact us for assistance.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-600">
          <p className="mb-2">Need help? Contact us:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="tel:17584517885" className="flex items-center hover:text-primary">
              <span className="material-icons mr-1" style={{ fontSize: '18px' }}>phone</span>
              1758 451-7885
            </a>
            <a href="mailto:info@guyscarrental.com" className="flex items-center hover:text-primary">
              <span className="material-icons mr-1" style={{ fontSize: '18px' }}>email</span>
              info@guyscarrental.com
            </a>
            <a href="https://wa.me/17584517885" className="flex items-center hover:text-primary">
              <span className="material-icons mr-1" style={{ fontSize: '18px' }}>chat</span>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReservationsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-icons text-primary animate-spin text-6xl">refresh</span>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ReservationForm />
    </Suspense>
  );
}
