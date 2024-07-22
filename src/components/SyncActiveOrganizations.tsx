"use client";
import { useEffect } from "react";
import { useAuth, useOrganizationList } from "@clerk/nextjs";


/**
 * @brief This function is used to sync the active organization of the user with the first organization in the membership
 * @param membership is the membership of the user in the organizations, the key is the organization ID and the value is the role of the user in the organization
 * @returns null, it doesn't return anything. It just syncs the active organization with the first organization in the membership
 */
export function SyncActiveOrganization({
    membership,
}: {
    membership?: Record<string, string>;
}) {
    const { setActive, isLoaded } = useOrganizationList();

    const { orgId } = useAuth();

    const firstOrgId = Object.keys(membership ?? {})?.[0];

    useEffect(() => {
        if (!isLoaded) return;

        if (!orgId && firstOrgId) {
            void setActive({ organization: firstOrgId });
        }
    }, [isLoaded, setActive, orgId, firstOrgId]);

    return null;
}