'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface ClubLocation {
  id?: string;
  rotaryId?: string;
  name: string;
  type?: string;
  state: string;
  city?: string;
  meetingSchedule?: string;
  meetingDay?: string;
  meetingTime?: string;
  meetingVenue?: string;
  memberCount?: number | string;
  zone?: string;
  coordinates?: { lat: number; lng: number };
}

interface ClubMapProps {
  clubs: ClubLocation[];
  activeClubId: string | null;
  onSelectClub: (id: string) => void;
}

const getMarkerColor = (type?: string) => {
  const t = type?.toLowerCase() || '';
  if (t.includes('campus') || t.includes('institution') || t.includes('student')) return '#8B3A7A'; // Purple for Campus
  if (t.includes('community') || t.includes('cb')) return '#A70C43'; // Rose for Community
  return '#981132'; // Cranberry for Professional / Standard
};

const createCustomIcon = (type?: string, isActive: boolean = false) => {
  const color = getMarkerColor(type);
  const scale = isActive ? 1.25 : 1.0;

  const svgHtml = `
    <div style="position: relative; width: 34px; height: 46px; transform: scale(${scale}); transform-origin: bottom center; transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="46" viewBox="0 0 34 46" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.35));">
        <defs>
          <linearGradient id="grad-${color.replace('#','')}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${color}" />
            <stop offset="100%" stop-color="${color}" stop-opacity="0.85" />
          </linearGradient>
        </defs>
        <ellipse cx="17" cy="44" rx="6" ry="2.2" fill="rgba(0,0,0,0.25)"/>
        <path d="M17,46 C14,42 4,30 4,18 A13,13 0 1 1 30,18 C30,30 20,42 17,46 Z" fill="url(#grad-${color.replace('#','')})" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/>
        <circle cx="17" cy="18" r="4.5" fill="white" opacity="0.95"/>
      </svg>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [34, 46],
    iconAnchor: [17, 46],
    popupAnchor: [0, -42],
  });
};

export default function ClubMap({ clubs, activeClubId, onSelectClub }: ClubMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      // Default center across D9126 region (approx center around Osun/Oyo/Kwara)
      const map = L.map(mapContainerRef.current, {
        center: [7.85, 4.5],
        zoom: 7.5,
        zoomControl: false,
      });

      // CartoDB Positron Light Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Add Zoom Controls to bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapRef.current = map;
    }

    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Populate markers
    clubs.forEach((club) => {
      const clubId = club.id || club.rotaryId || club.name;
      // Default fallback coordinate matching district territory
      const lat = club.coordinates?.lat || 7.3775;
      const lng = club.coordinates?.lng || 3.947;

      const isCurrentActive = activeClubId === clubId;
      const marker = L.marker([lat, lng], {
        icon: createCustomIcon(club.type, isCurrentActive),
      });

      const popupHtml = `
        <div style="font-family: Inter, sans-serif; padding: 12px; background: rgba(15, 22, 36, 0.95); backdrop-filter: blur(12px); border-radius: 14px; color: white; min-width: 200px; box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
          <div style="font-size: 9px; font-weight: 700; color: #D91B5C; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 3px;">
            ${club.type || 'COMMUNITY BASED'} · ${club.state.toUpperCase()}
          </div>
          <div style="font-size: 13px; font-weight: 800; color: white; margin-bottom: 6px; line-height: 1.3;">
            ${club.name}
          </div>
          <div style="font-size: 10.5px; color: rgba(255,255,255,0.7); margin-bottom: 10px; line-height: 1.4;">
            📍 ${club.city || club.state} · 🕒 ${club.meetingSchedule || club.meetingDay || 'Weekly Meetings'}
          </div>
          <a href="/join?club=${encodeURIComponent(club.name)}" style="display: block; text-align: center; background: #981132; color: white; padding: 7px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-decoration: none; transition: background 0.2s;">
            Express Interest →
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: 'custom-map-popup',
        closeButton: false,
      });

      marker.on('click', () => {
        onSelectClub(clubId);
      });

      marker.addTo(map);
      markersRef.current[clubId] = marker;
    });

    // Invalidate size on mount to ensure smooth canvas sizing
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      // Map cleanup on unmount
    };
  }, [clubs]);

  // Handle zooming/panning when an active club is selected from the list
  useEffect(() => {
    if (!mapRef.current || !activeClubId) return;

    const marker = markersRef.current[activeClubId];
    if (marker) {
      const latLng = marker.getLatLng();
      mapRef.current.flyTo(latLng, 12, { duration: 1.2 });
      marker.openPopup();
    }
  }, [activeClubId]);

  return (
    <div className="relative w-full h-full min-h-[450px] rounded-2xl overflow-hidden shadow-inner border border-black/10">
      <div ref={mapContainerRef} className="w-full h-full min-h-[450px]" />
    </div>
  );
}
