import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load the data from the uploaded file
df = pd.read_csv('/mnt/data/gpt_text.csv', parse_dates=['created_at'])

# Extracting unique parties from the dataset
parties = df['party'].unique()

# Defining the discourses and polarization poles
discourses_poles = [
    'oligarchy_AntiIvanishvili', 'oligarchy_ProIvanishvili',
    'polarisation_GovGuilt', 'polarisation_OpositionGuilt',
    'august_war_RussianGuilt', 'august_war_GeorgianGuilt',
    'west_ProWest', 'west_AntiWest',
    'russia_AntiRussian', 'russia_ProRussian',
    'saakashvili_ProSaakashvili', 'saakashvili_AntiSaakashvili',
    'left_vs_right_Liberal', 'left_vs_right_Conservative',
    'economics_Positiv', 'economics_Negative',
    'ukraine_ProUkraine', 'ukraine_ProRussian',
    'media_ProMedia', 'media_AntiMedia',
    'geo_ukr_MoreSupportNeeded', 'geo_ukr_AntiUkraine',
]

# Preparing data for the heatmap
heatmap_data = df.groupby('party')[discourses_poles].sum().T

# Plotting the heatmap
plt.figure(figsize=(15, 10))
sns.heatmap(heatmap_data, annot=True, cmap='Greys', cbar=False, fmt='.0f')
plt.title('Heatmap of Discourses and Polarization Poles by All Parties')
plt.xlabel('Political Party')
plt.ylabel('Discourse / Polarization Pole')
plt.xticks(rotation=45, ha='right')
# Set yticks - get current axes and set the yticks and labels
ax = plt.gca()
ax.set_yticks(np.arange(len(heatmap_data.index)))
ax.set_yticklabels(heatmap_data.index, rotation=0)
plt.tight_layout()
plt.show()


# Updating the renaming dictionary to change 'geo_ukr' to "Support to Ukraine"
renaming_dict_with_updated_titles = {
    'Georgia\'s Oligarchs': "Georgia's Oligarchs", # Title for oligarchy discourses
    'oligarchy_AntiIvanishvili': "Ivanishvili Opposition",
    'oligarchy_ProIvanishvili': "Ivanishvili Support",

    'Political Divide': "Political Divide", # Title for polarisation discourses
    'polarisation_GovGuilt': "Government Blame",
    'polarisation_OpositionGuilt': "Opposition Blame",

    'August Conflict': "August Conflict", # Title for august_war discourses
    'august_war_RussianGuilt': "Russian Fault",
    'august_war_GeorgianGuilt': "Georgian Fault",

    'Western Ties': "Western Ties", # Title for west discourses
    'west_ProWest': "West Advocacy",
    'west_AntiWest': "West Opposition",

    'Russia Relations': "Russia Relations", # Title for russia discourses
    'russia_AntiRussian': "Russia Critique",
    'russia_ProRussian': "Russia Support",

    'Saakashvili Saga': "Saakashvili Saga", # Title for saakashvili discourses
    'saakashvili_ProSaakashvili': "Saakashvili Defense",
    'saakashvili_AntiSaakashvili': "Saakashvili Criticism",

    'Ideological Spectrum': "Ideological Spectrum", # Title for left_vs_right discourses
    'left_vs_right_Liberal': "Liberal Advocacy",
    'left_vs_right_Conservative': "Conservative Advocacy",

    'Economic Analysis': "Economic Analysis", # Title for economics discourses
    'economics_Positiv': "Economic Optimism",
    'economics_Negative': "Economic Pessimism",

    'War in Ukraine': "War in Ukraine", # Title for ukraine discourses
    'ukraine_ProUkraine': "Ukraine Support",
    'ukraine_ProRussian': "Russia Sympathy",

    'Media Landscape': "Media Landscape", # Title for media discourses
    'media_ProMedia': "Media Freedom",
    'media_AntiMedia': "Media Censure",

    'Support to Ukraine': "Support to Ukraine", # Updated title for geo_ukr discourses
    'geo_ukr_MoreSupportNeeded': "More Support",
    'geo_ukr_AntiUkraine': "Less Support",
}

# Creating a new DataFrame for the heatmap with updated discourse titles
heatmap_data_with_updated_titles = heatmap_data.copy()
heatmap_data_with_updated_titles = heatmap_data_with_updated_titles.rename(index=renaming_dict).reindex(renaming_dict_with_updated_titles.values())

# Plotting the updated heatmap
plt.figure(figsize=(15, 12))
sns.heatmap(heatmap_data_with_updated_titles, annot=True, cmap='Greys', cbar=False, fmt='.0f')
plt.title('Heatmap of Discourses and Polarization Poles by All Parties')
plt.xlabel('Political Party')
plt.ylabel('')

# Adjusting the y-tick labels to account for the new titles and structure
ax = plt.gca()
y_tick_positions = np.arange(len(heatmap_data_with_updated_titles)) + 0.5
ax.set_yticks(y_tick_positions)
ax.set_yticklabels(heatmap_data_with_updated_titles.index, rotation=0)
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.show()


# Correcting the approach to make only the discourse titles bold
plt.figure(figsize=(15, 12))
ax = sns.heatmap(heatmap_data_with_updated_titles, annot=True, cmap='Greys', cbar=False, fmt='.0f')
plt.title('Heatmap of Discourses and Polarization Poles by All Parties')
plt.xlabel('Political Party')
plt.ylabel('')

# Adjusting the y-tick labels to account for the new titles and structure
y_tick_positions = np.arange(len(heatmap_data_with_updated_titles)) + 0.5
ax.set_yticks(y_tick_positions)
y_labels = heatmap_data_with_updated_titles.index

# Making only the discourse titles bold in y-tick labels
bold_labels = [f"$\mathbf{{{label}}}$" if label in renaming_dict_with_updated_titles else label for label in y_labels]
ax.set_yticklabels(bold_labels, rotation=0)
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.show()
