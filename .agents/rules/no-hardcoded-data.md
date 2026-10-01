# No Hardcoded User Data

**CRITICAL INSTRUCTION:**
Never hardcode user-specific data (names, emails, club names, roles, IDs, stats, avatars) anywhere in the codebase.

1. All user-facing data MUST come from the database (Firestore) or the authenticated user session (localStorage/auth).
2. Initial state values and fallback defaults should use generic placeholders like "Loading...", "-", or empty strings - never realistic fake data like "Tunde Adeyemi" or "RAC Ibadan Central".
3. When adding new fields or sections, always wire them to the corresponding database field or auth session property.
4. If a database query fails or returns no data, show a graceful empty state - not fake placeholder content.
5. Before pushing any dashboard or portal changes, verify that ALL displayed data is dynamically sourced.
