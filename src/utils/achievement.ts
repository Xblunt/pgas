export function groupAchievementsByCategory(achievements: any[]): any[] {
    const grouped = achievements.reduce(
        (acc: { [key: string]: { category_uuid: string; achievements: any[] } }, achievement) => {
            const categoryName = achievement.category_name;
            
            if (!acc[categoryName]) {
                acc[categoryName] = {
                    category_uuid: achievement.category_uuid,
                    achievements: []
                };
            }
            
            acc[categoryName].achievements.push(achievement);
            return acc;
        },
        {}
    );
    
    return Object.entries(grouped).map(([categoryName, data]) => ({
        category_name: categoryName,
        category_uuid: data.category_uuid,
        achievementQuantity: data.achievements.length,
        achievements: data.achievements
    }));
}

export function transformToDropdownItems (achievements: any[]): any[] {
    return achievements.map(achievement => ({
        uuid: achievement.uuid,
        title: achievement.comment || "",
        subtitle: achievement.attachment_link || "",
        points: achievement.point_amount || 0,
        tags: [
            achievement.status,
        ]
    }));
}

export function categoriesToUserAchievements(categories: any[]): any[] {
    return categories.map(category => ({
        category_name: category.name,
        category_uuid: category.uuid || '',
        achievementQuantity: 0,
        achievements: []
    }));
}