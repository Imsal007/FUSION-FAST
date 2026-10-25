# Meta campaign plan: SAL Digital free restaurant website demo

Budget 5 GBP a day, UK-wide. You launch this in Meta Ads Manager (this session has no ad account access).
Labels: **FACT** (known), **HYPOTHESIS** (to test), **MISSING** (not known yet, do not guess).

## 1. Before launch (15 minutes)

1. **Check the conversion event.** In Events Manager, open the SAL Digital pixel and submit the demo form on https://saldigital.co/lp/restaurants/ once yourself. Confirm a `Lead` event fires on submit (Test Events tab). If only `PageView` shows, the campaign cannot optimise for leads yet. MISSING: whether `Lead` fires today.
2. **Check the WhatsApp button.** If the "Or message us" link fires a `Contact` event, keep it; it is the fallback optimisation event. MISSING.
3. **Consent banner.** Visitors who click "Essential only" will not be tracked, so Meta will under-count leads. Compare Meta's lead count with the real form submissions you receive each week. Conversions API would close the gap later.
4. **Replace the demo WhatsApp number** on the four demo sites if you do not want messages from strangers who find them (currently 447508407866).

## 2. Structure

| Level | Setting |
|---|---|
| Campaign | Objective **Leads**. Advantage campaign budget **off** (one ad set, so budget sits on the ad set). Name: `SAL | Restaurant demo | UK` |
| Ad set | Conversion location **Website**, event **Lead**. Budget **5 GBP daily**. Location **United Kingdom**. Age 25 to 64. Language English. Advantage+ audience **on**, with suggestions: interests Restaurant, Fast food restaurant, Takeaway, Small business; behaviour Small business owners. Placements **Advantage+**. |
| Ads | Three at a time (more than three splits 5 GBP too thin). |

**Fallback:** if after 7 days there are fewer than 3 leads, switch the ad set to optimise for **Landing page views** for a week to feed the pixel, then switch back. HYPOTHESIS: at 5 GBP a day, `Lead` may not get enough events to leave the learning phase quickly.

## 3. Launch order

**Week 1 (start with these three):**

| Ad | Creative | Why |
|---|---|---|
| A | R1 Cinder & Bun reel (`r1_burger`) | Product-led: shows the site working |
| B | R5 Commission reel (`r5_commission`) | Money-led: the pain owners feel |
| C | C1 Commission carousel (`c1_commission`) | Same angle, static format |

**Week 2:** pause the weakest, add **R7 Four demos** (`r7_four`).
**Week 3:** pause the weakest, add **R6 Looks cheap** (`r6_cheap`).
Keep R2 to R4, C2, C3 and S1 to S4 in reserve. Use the cuisine-specific ones if form data shows one cuisine replying more.

## 4. Tests (one question at a time)

1. HYPOTHESIS: the money angle (R5) gets a cheaper lead than the product angle (R1). Compare cost per lead once each ad has spent 25 GBP.
2. HYPOTHESIS: the reel beats the carousel on click-through rate for the same angle (R5 vs C1). Compare link CTR after 2,000 impressions each.
3. HYPOTHESIS: "Get offer" beats "Learn more" as the button. Test only after a winning creative is clear.

## 5. When to pause or keep an ad

Check on day 3 and day 7, then weekly. Do not judge an ad before it has 1,000 impressions.

- **Pause** if link CTR is under 0.6% after 2,000 impressions.
- **Pause** if it has spent 30 GBP with no lead and the others have leads.
- **Keep** the ad with the lowest cost per lead, and test a new hook against it.
- **Target cost per lead:** MISSING. Work it out as: what one client pays you, times the share of demo requests that become clients, divided by about 3 (for a margin). Example only: 600 GBP per site, 1 in 5 demos convert, so a lead is worth about 120 GBP; aim for 40 GBP or less.

## 6. Tracking links

All links use:

```
https://saldigital.co/lp/restaurants/?utm_source=meta&utm_medium=paid_social&utm_campaign=restaurant_demo_uk&utm_content=<id>
```

`<id>` per ad is listed in AD-COPY.md. In GA4, check Reports, Acquisition, Traffic acquisition, filtered by session campaign `restaurant_demo_uk`.

## 7. What to send back to me after week 1

Impressions, link clicks, CTR, cost per result and leads for each ad, plus how many demo requests came through the form and WhatsApp. With that I can pick the winner and write the next round of hooks.
